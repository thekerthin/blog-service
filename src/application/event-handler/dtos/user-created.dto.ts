import { Event } from '@kerthin/cqrs';
import { UserDomainEntity } from '@domain/entities/user-domain.entity';

export class UserCreatedDto extends Event<UserDomainEntity> {
  data: UserDomainEntity;
  context: string = 'user';
  action: string = 'userCreated';
}
