import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptProvider } from 'src/common/providers/bcrypt.provider';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly bcryptProvider: BcryptProvider,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, passwordConfirmad, ...params } = createUserDto;

    const passwordIsConfirmed = password === passwordConfirmad;

    if (!passwordIsConfirmed) {
      throw new BadRequestException(`Confirmation password is different`);
    }

    const user = await this.userRepository.save({
      password: await this.bcryptProvider.hash(password),
      ...(params as unknown as User),
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.findOne(id);

    let { password } = updateUserDto;
    const { passwordConfirmad, ...params } = updateUserDto;
    const passwordIsConfirmed = password === passwordConfirmad;

    if (password && passwordConfirmad && !passwordIsConfirmed) {
      throw new BadRequestException(`Confirmation password is different`);
    }

    if (password && passwordConfirmad && passwordConfirmad) {
      password = await this.bcryptProvider.hash(password);
    }

    await this.userRepository.update(
      { id },
      { ...(params as unknown as Partial<User>), password },
    );
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete({ id });
  }
}
