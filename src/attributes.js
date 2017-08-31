const defaultAttrs = ['onChange'];
const attrsActionsRels = {
  onChange: 'onChange',
};


function mapActionsToAttrs(actions: Object, attrs: string[] = defaultAttrs): Object {
  return attrs.reduce((acc: { onChange?: string }, attr: string) => {
    return {
      ...acc,
      [attr]: actions[attrsActionsRels[attr]],
    };
  }, {});
}

function mergeActionsToProps(stateProps, dispatchProps, ownProps) {
  return Object.assign(
    {},
    ownProps,
    stateProps,
    dispatchProps,
    {
      fieldAttrs: mapActionsToAttrs(dispatchProps),
    },
  );
}


export default mergeActionsToProps;
