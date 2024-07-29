import runTippy from 'tippy.js';

 const tippy = (element, props) => {
    const { destroy, setProps: update } = runTippy(element, props);
    return {
        destroy,
        update
    };
};

export const createTippy = defaultProps => (element, props) =>
    tippy(element, { ...props, ...defaultProps });


export default tippy;