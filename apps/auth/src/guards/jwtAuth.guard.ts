import { AuthGuard } from '@nestjs/passport';

// local nome da strategia usada em local.strategy.ts, Strategy padrao e local
export class JwtAuthGuard extends AuthGuard('jwt') {}
