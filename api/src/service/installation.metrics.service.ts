import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import MatomoTracker from 'matomo-tracker'
import { PinoLogger } from 'nestjs-pino'

@Injectable()
export class InstallationMetricsService implements OnApplicationBootstrap {
  private host = 'https://metrics.ohmyform.com/matomo.php'

  constructor(
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {
    logger.setContext(this.constructor.name)
  }

  onApplicationBootstrap(): void {
    if (this.configService.get<boolean>('DISABLE_INSTALLATION_METRICS')) {
      this.logger.info('installation metrics are disabled')
      return
    }

    const tracker = new MatomoTracker(2, this.host)

    tracker.on('error', () => {
      this.logger.error('failed to add installation metrics')
    })

    this.logger.info('try to add startup metric')
    tracker.track({
      url: `http://localhost/version/${process.env.version}`,
      action_name: 'startup',
      ua: process.arch,
    })

    setInterval(() => {
      this.logger.info('try to add running metric')
      tracker.track({
        url: `http://localhost/version/${process.env.version}`,
        action_name: 'running',
        ua: process.arch,
      })
    }, 24 * 60 * 60 * 1000)
  }
}
