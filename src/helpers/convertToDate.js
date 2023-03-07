import { parseISO } from "date-fns";


export const convertToDate = (events =[]) => {

      return events.map(e=>{

            e.start = parseISO(e.start);
            e.end = parseISO(e.end);

            return e;
      });

};
