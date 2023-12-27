type TimePicker = {
    title?:string
    pattern?:string,
    mixDate?:string,
    maxDate?:string,
    selectDate ? :string
  }


  type NormaItem = {
    label?:string
    value?:string
  }

  type NormalPicker = {
    title?:string
    array?:NormaItem[]
    selectItem?:NormaItem
  }

  type CityProps = {
    selcetCity?:CityResult,
    title?:string
  }

  type CityResult = {
    //省市县
    province:string
    city:string
    area:string
  }

  type LinkResult = {
    label: string;
    value: {
        label: string;
        value: string;
    }
  }

  type LinkType = {
    label: string;
    value: {
        label: string;
        value: string;
    }[]
  }

  type Linkage = {
    title?:string
    array?:LinkType[]
  }

  export type {TimePicker,NormaItem,NormalPicker,CityResult,LinkResult,Linkage,CityProps}
