export interface SystemCPU {

  name: string;
  description: string;
  baseUnit: any;
  measurements: [
    {
      statistic: string,
      value: number,
    }
  ];
  availableTags: any[];


// {
//   "name": "system.cpu.count",
//   "description": "The number of processors available to the Java virtual machine",
//   "baseUnit": null,
//   "measurements": [
//     {
//       "statistic": "VALUE",
//       "value": 8.0
//     }
//   ],
//   "availableTags": [
//
//   ]
// }
}
