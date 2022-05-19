import type { ShipConfig } from '../configs/ship.config';

import type { Phase } from './phase';

export class CleanPhase implements Phase {
  constructor(private readonly config: ShipConfig) {}
  public readonly readableName = 'Clean repository';

  public run(): void {
    this.config.destinationRepo.clone().clean();
  }
}
