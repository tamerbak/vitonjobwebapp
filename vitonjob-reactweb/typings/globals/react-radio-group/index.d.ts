declare module "react-radio-group" {
  import RadioGroup = __RadioGroup;
  export = RadioGroup;
}

declare namespace __RadioGroup {

  import React = __React;

  class RadioGroup extends React.Component<any, any> {}

  class Radio extends React.Component<any, any> {}

}
