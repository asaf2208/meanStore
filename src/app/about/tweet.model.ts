import { StringMap } from '@angular/core/src/render3/jit/compiler_facade_interface';

export interface Tweet {
  id :String;
  text: String;
  created_at:String;
  created_by : String;
  filter : number[];
}
