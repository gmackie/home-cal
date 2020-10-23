import React, { ChangeEvent, ReactNode } from 'react';
import MaterialTable, { Column } from 'material-table';
import { Meal, ProteinType } from '../types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface TableState {
  columns: Array<Column<Meal>>;
  data: Array<Meal>;
}

interface MealTableProps {
  onRowAdd(meal: Meal): Promise<any>;
  onRowUpdate(meal: Meal, oldMeal: Meal | undefined): Promise<any>;
  onRowDelete(meal: Meal): Promise<any>;
  data: Meal[];
}

export default function MealsTable(props: MealTableProps) {
  const {
    onRowAdd,
    onRowUpdate,
    onRowDelete,
    data,
  } = props;
  interface ProteinTypeSelectorProps {
    value: ProteinType;
    onChange(value: ProteinType): void;
  }
  const ProteinTypeSelector = (props: ProteinTypeSelectorProps) => {
    const {value, onChange} = props;
    return (
      <Select
        value={value}
        onChange={e => onChange(e.target.value as ProteinType)}
      >
        {
          Object.keys(ProteinType).map((proteinType, index) => 
            <MenuItem value={index}>
              {proteinType}
            </MenuItem>
          )
        }
      </Select>
    )
  };


  const columns: Column<Meal>[] = [
    { 
      title: 'Meal Name',
      field: 'mealName',
      type: 'string',
    },
    {
      title: 'Protein Type',
      field: 'proteinType',
      editComponent: ProteinTypeSelector,
    },
  ];

  return (
    <MaterialTable<Meal>
      title="Meals"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: onRowAdd,
        onRowUpdate: onRowUpdate,
        onRowDelete: onRowDelete,
      }}
    />
  );
}