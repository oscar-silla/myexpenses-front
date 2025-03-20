import { AuthCredentials } from '../types/models/request/auth/auth-credentials.type';
import { Observable } from 'rxjs';
import { Token } from '../types/models/response/auth/token.type';

export interface AuthServiceInterface {
  login(credentials: AuthCredentials): Observable<Token>;
}
