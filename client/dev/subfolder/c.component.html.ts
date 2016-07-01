export const HTML: string =
`
<div class="child-cmp-container">
  <h2>Hello World from CHILD component with RELATIVE path</h2>
  <p>(Child): {{msg}}</p>
  <p *ngIf="pMsg">(Child): {{pMsg}}</p>
  <button (click)="changeMsg()">{{isBtnClicked ? 'Restore':'Change Msg'}}</button>
  <button (click)="setMsgAfter5Sec()">Set Msg after 5 sec</button>
</div>

<donut-graph
 [data]="chartData"
></donut-graph>
`;
