import { Controller } from '@nestjs/common';
import { LecturesService } from './lectures.service';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}
}
