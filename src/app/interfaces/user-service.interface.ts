import { Observable } from 'rxjs';
import { UserRequest } from '../types/models/request/user/user-request.type';

export interface UserServicePort {
  save(body: UserRequest): Observable<Object>;
}
