interface TimerSession {
  timeStarted: Date;
  timeFinished: Date;
  runtime: number;
}

interface PayPeriod {
  hourly: number;
}

interface PayPeriodMap {
  [key: string]: PayPeriod;
};

export interface Timer {
  name: string;
  position: number;
  runtime: number;
  id?: string;
  //active: boolean;
  owner: string;
  timeStarted: Date;
  timeUpdated: Date;
  sessions: TimerSession[];
  payPeriods: PayPeriodMap;
}
