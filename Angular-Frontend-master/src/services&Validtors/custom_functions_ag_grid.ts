import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CurrencycellrendererService {



}

export function CurrencyCellRendererUSD(params: any) {
  var inrFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  return inrFormat.format(params.value);
}

export class NumbercellrendererService { }

export function NumberCellRenderer(params: any) {
  var inrFormat = new Intl.NumberFormat('en-US',);
  return inrFormat.format(params.value);
}


export function filterValueGetter(params) {
  var colGettingGrouped = params.colDef.showRowGroup;
  var valueForOtherCol = params.api.getValue(
    colGettingGrouped,
    params.node
  );
  return valueForOtherCol;
};


export function getRowStyle(params) {
  if (params.node.rowIndex % 2 === 0) {
    return { background: '#e6eaf0' };
  }
};


export function minAndMaxAggFunction(values) {
  var result = {
    min: null,
    max: null,
    toString: function () {
      return '(' + this.min + '..' + this.max + ')';
    },
  };
  values.forEach(function (value) {
    var groupNode =
      value !== null && value !== undefined && typeof value === 'object';
    var minValue = groupNode ? value.min : value;
    var maxValue = groupNode ? value.max : value;
    result.min = min(minValue, result.min);
    result.max = max(maxValue, result.max);
  });
  return result;
}



function min(a, b) {
  var aMissing = typeof a !== 'number';
  var bMissing = typeof b !== 'number';
  if (aMissing && bMissing) {
    return null;
  } else if (aMissing) {
    return b;
  } else if (bMissing) {
    return a;
  } else if (a > b) {
    return b;
  } else {
    return a;
  }
}

function max(a, b) {
  var aMissing = typeof a !== 'number';
  var bMissing = typeof b !== 'number';
  if (aMissing && bMissing) {
    return null;
  } else if (aMissing) {
    return b;
  } else if (bMissing) {
    return a;
  } else if (a < b) {
    return b;
  } else {
    return a;
  }
}






export function increase(textSize, width, columnDefs, gridApi) {
  console.log("Hello Im Here 2")
  textSize = textSize + .50

  console.log(textSize)
  width = width + .50
  console.log(width)
  gridApi.setColumnDefs(columnDefs);
  this.refresh_Cells(gridApi)
}

export function decrease() {
  this.textSize = this.textSize - .50
  console.log(this.textSize)
  this.width = this.width - .50
  console.log(this.width)
  this.gridApi.setColumnDefs(this.columnDefs);
  this.refreshCells()
}

export function refresh_Cells(gridApi) {
  var params = {
    force: true
  };
  gridApi.refreshCells({
    force: true
  });

}


function allInOne(offset: number) {
  if (offset > 0) {
    this.increase()
  }
  else {
    this.decrease()
  }
  const columnState = this.gridColumnApi?.getColumnState();
  console.log(columnState);

  columnState?.forEach((c) => {
    if (c.width) {
      console.log(c.width)
      this.gridColumnApi?.setColumnWidth(c.colId, c.width + offset);

    }

  });
  // }




}


