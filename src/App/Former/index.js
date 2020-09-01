import Former from './former';

const sectionFormer = new Former({
    title: 'former',
    subtitle: 'parameters',
    reset: 'reset',

    inputs: [{
            name: 'trunk',
            value:'2',
            min: '1',
            max: '3',
        }, {
            name: 'branch',
            value:'7',
            min: '5',
            max: '10',

        }, {
            name: 'spread',
            value:'25',
            min: '15',
            max: '90',
        }]
})

const former = document.createDocumentFragment();

former.appendChild(sectionFormer.elem);

export default former;
