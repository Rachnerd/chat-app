import { Response } from '@angular/http';

export const json = (res: Response): any => res.json();
export const logError = (error: Response) => console.error(error);
