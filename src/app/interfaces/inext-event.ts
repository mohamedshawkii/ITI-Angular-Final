import { IEventHighlight } from './ievent-highlight';

export interface INextEvent {
  title: string;
  date: string;
  dateTime: string;
  location: string;
  entry: string;
  highlights: IEventHighlight[];
}
