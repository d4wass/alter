import { AuthService } from './auth.service';
import { HttpMethod, SpectatorHttp, createHttpFactory } from '@ngneat/spectator';
import { User, UserDataToUpdate } from '../../+state/models/user.model';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  const apiUrl = environment.apiUrl;
  const mockUser: User = {
    id: '1',
    firstName: 'Test',
    lastName: 'User',
    email: 'mocked@gmail.com',
    password: 'password'
  };
  const token = 'token';

  let spectator: SpectatorHttp<AuthService>;
  let service: AuthService;

  const createHttp = createHttpFactory({
    service: AuthService,
    providers: []
  });

  beforeEach(() => {
    spectator = createHttp();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a user', () => {
    service.createUser(mockUser).subscribe();
    const req = spectator.expectOne(`${apiUrl}/users`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email,
      password: mockUser.password
    });
  });

  it('should login a user', () => {
    service.loginUser(mockUser.email, mockUser.password).subscribe((response) => {
      expect(response).toEqual({ access_token: token });
    });
    const req = spectator.expectOne(`${apiUrl}/users/login`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      email: mockUser.email,
      password: mockUser.password
    });
    req.flush({ access_token: token });
  });

  it('should get a user profile data', () => {
    const mockProfile: User = {
      id: '1',
      firstName: 'Test',
      lastName: 'User',
      email: 'mocked@gmail.com',
      password: 'password'
    };

    service.getUserProfile(token).subscribe((profile) => {
      expect(profile).toEqual(mockProfile);
    });
    const req = spectator.expectOne(`${apiUrl}/users/login/profile`, HttpMethod.GET);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(mockProfile);
  });

  it('should validate user data update', () => {
    const mockData = {
      passwordUpdate: {
        oldValue: 'password',
        newValue: 'newPassword',
        confirmValue: 'newPassword'
      },
      mobileUpdate: {
        oldValue: '123456789',
        newValue: '987654321',
        confirmValue: '987654321'
      }
    };

    service.validateUserDataUpdate(mockData, token).subscribe((response) => {
      expect(response).toEqual({
        isPasswordValid: true,
        isMobileValid: true
      });
    });
    const req = spectator.expectOne(`${apiUrl}/validate`, HttpMethod.POST);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush({
      isPasswordValid: true,
      isMobileValid: true
    });
  });

  it('should update user data', () => {
    const updateData: UserDataToUpdate = {
      descriptionUpdate: 'new description',
      mobileUpdate: {
        newValue: '987654321',
        oldValue: '123456789',
        confirmValue: '987654321'
      }
    };

    service.updateUserData(updateData, token).subscribe();
    const req = spectator.expectOne(`${apiUrl}/users`, HttpMethod.PUT);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.body).toEqual(updateData);
  });
});
