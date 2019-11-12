import { Injectable } from '@nestjs/common';
import { isNotEmptyOrNil, ValidationError, isEmptyOrNil, ElementNotFoundError } from '@kerthin/utils';
import { UserDomainEntity } from '../entities/user-domain.entity';
import UserRepository from '@infrastructure/database/repositories/user.repository';

@Injectable()
export default class UserDomainService {

  constructor(private readonly userRepository: UserRepository) { }

  async create(data: UserDomainEntity): Promise<UserDomainEntity> {
    const isUserRegister = await this.userRepository.findOneOr({ nickname: data.nickname, email: data.email });

    if (isNotEmptyOrNil(isUserRegister)) {
      throw new ValidationError('The nickname or email that you try to register already exists');
    }

    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async update(data: UserDomainEntity): Promise<UserDomainEntity> {
    const user = await this.userRepository.findOne({ id: data.id });
    if (isEmptyOrNil(user)) {
      throw new ElementNotFoundError(`The user with id '${data.id}' doesn't exists.`);
    }

    const isUserRegister = await this.userRepository.findOneOr({ nickname: data.nickname, email: data.email });
    if (isNotEmptyOrNil(isUserRegister)) {
      throw new ValidationError('The nickname or email that you try to register already exists');
    }

    return this.userRepository.save({ ...user, ...data });
  }


}
