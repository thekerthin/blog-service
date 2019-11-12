import { IEventHandler, EventHandler } from '@kerthin/cqrs';
import { UserCreatedDto } from '../dtos/user-created.dto';
import UserDomainService from '@domain/services/user-domain.service';

@EventHandler(UserCreatedDto)
export default class UserCreatedEvent implements IEventHandler<UserCreatedDto> {

  constructor(private readonly userDomainService: UserDomainService) { }

  async handle({ data }: UserCreatedDto): Promise<void> {
    console.log('data', data);
    await this.userDomainService.create(data);
  }

}