import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgGridService {


  refreshCells(gridApi) {
    var params = {
      force: true
    };
    gridApi.refreshCells(params);

  }

  hide(menu) {
    if (menu == true) {
      console.log(menu)
      menu = false
    } else {
      menu = true
    }
    return menu;
  }

  increase(textSize, width, columnDefs, gridApi) {
    console.log('increase')
    textSize = textSize + .50

    console.log(textSize)
    width = width + 10
    console.log(width)
    gridApi.setColumnDefs(columnDefs);
    this.refreshCells(gridApi)

  }

  decrease(textSize, width, columnDefs, gridApi) {
    textSize = textSize - .50
    console.log(textSize)
    width = width - 10
    console.log(width)
    gridApi.setColumnDefs(columnDefs);
    this.refreshCells(gridApi)

  }


  allInOne(offset: number, textSize, width, columnDefs, gridApi, gridColumnApi) {
    console.log(offset)
    if (offset > 0) {
      this.increase(textSize, width, columnDefs, gridApi)
    }
    else {
      this.decrease(textSize, width, columnDefs, gridApi)
    }
    const columnState = gridColumnApi?.getColumnState();
    console.log(columnState);

    columnState?.forEach((c) => {
      if (c.width) {
        console.log(c.width)
        gridColumnApi?.setColumnWidth(c.colId, c.width + offset);

      }

    });
  }





  pivoton2(gridApi, gridColumnApi) {

    gridColumnApi.setPivotMode(false);
    gridColumnApi.setRowGroupColumns(([]))
    gridApi.setFilterModel(null);
    gridApi.onFilterChanged();
    gridColumnApi.autoSizeColumns();
    gridColumnApi.setPivotMode(true);
    gridColumnApi.setRowGroupColumns((['asin1']))
  }



  clearall(gridColumnApi, gridApi) {
    console.log('clearall')
    gridColumnApi.setPivotMode(false);
    gridColumnApi.setRowGroupColumns(([]))
    gridApi.setFilterModel(null);
    gridColumnApi.resetColumnState();
    gridColumnApi.resetColumnGroupState();
    gridApi.setSortModel(null);
    gridApi.onFilterChanged();
    gridApi.stopEditing(true);
    gridColumnApi.autoSizeColumns();
  }

  defualtColDef(width) {
    var defaultColDef: any;

    defaultColDef = {
      filter: true,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
      width: width,
      cellFilter: 'number: 2',
      enableValue:true,
      menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
      sortingOrder: ['asc', 'desc', 'null'],
    };
    return defaultColDef
  }

  create_gridoptions(columnDefs) {
    var gridOptions = {
      context: this,
      headerHeight: 30,
      groupHeaderHeight: 30,
      rowHeight: 35,
      floatingFilter: false,
      animateRows: true,
      columnDefs: columnDefs,
      groupMultiAutoColumn: true,
      groupDefaultExpanded: -1,
      groupHideOpenParents: true,
      suppressMakeColumnVisibleAfterUnGroup: true,
      autoSizeColumns: true,
      suppressAggFuncInHeader: true,
      suppressMenuHide: true,
      suppressColumnVirtualisation: true,
      suppressCopyRowsToClipboard: true,
      pivotColumnGroupTotals: 'before',
      pivotRowGroupTotals: 'before',

      autoGroupColumnDef: {
        filterValueGetter: function (params) {
          var colGettingGrouped = params.colDef.showRowGroup;
          var valueForOtherCol = params.api.getValue(
            colGettingGrouped,
            params.node
          );
          return valueForOtherCol;
        },

        resizable: true,

        pinned: 'left',
        cellRendererParams: {
          suppressCount: true
        }
      },
      enableCharts: true,
      enableRangeSelection: true,
      // rowStyle: function (params) {
      //   if (params.node.rowIndex % 2 === 0) {
      //     return { background: '#e6eaf0' };
      //   }
      // },
      getRowStyle: function (params) {

        const { node } = params;
        if (node.group) {
          if (node.firstChild && node.rowIndex != 0) {
            return { borderTop: "blue solid 1px !important" };
          }
        }

      },

    }
    return gridOptions
  }



  createsidebar() {
    var sideBar: any;
    sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: { suppressSyncLayoutWithGrid: true },
        },
      ],
      defaultToolPanel: 'columns',
    };
  }

}
