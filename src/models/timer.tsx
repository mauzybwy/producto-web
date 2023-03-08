interface TimerSession {
  timeStarted: Date;
  timeFinished: Date;
  runtime: number;
}

export interface Timer {
  name: string;
  runtime: number;
  id?: string;
  //active: boolean;
  owner: string;
  timeStarted: Date;
  timeUpdated: Date;
  sessions: TimerSession[];
}
