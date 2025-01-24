import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const allTasks = await this.prisma.task.findMany();
    return allTasks;
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (task?.name) return task;

    throw new HttpException('Tarefa não encontrada...', HttpStatus.NOT_FOUND);
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.prisma.task.create({
        data: {
          name: createTaskDto.name,
          description: createTaskDto.description,
          completed: false,
        },
      });
      return newTask;
    } catch (erro) {
      throw new HttpException(
        'Falha ao criar uma tarefa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const findTask = await this.prisma.task.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!findTask) {
        throw new HttpException(
          'Essa tarefa não existe!',
          HttpStatus.NOT_FOUND,
        );
      }

      const task = await this.prisma.task.update({
        where: {
          id: findTask.id,
        },
        data: updateTaskDto,
      });

      return task;
    } catch (erro) {
      console.log('erro: '+ erro);
      throw new HttpException(
        'Falha ao editar a tarefa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string) {
    try {
      const findTask = this.prisma.task.findFirst({
        where: {
          id: Number(id),
        },
      });
      await this.prisma.task.delete({
        where: {
          id: (await findTask).id,
        },
      });
      return {
        message: 'Tarefa deletada com sucesso!',
      };
    } catch (erro) {
      throw new HttpException(
        'Falha ao deletar a tarefa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
