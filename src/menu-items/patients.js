// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

// constant
const icons = {
    IconTypography: IconTypography,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconWindmill: IconWindmill,
    IconBrandFramer: IconBrandFramer,
    IconLayoutGridAdd: IconLayoutGridAdd
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const patients = {
    id: 'patients',
    title: 'Pacientes',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Gerenciar',
            type: 'item',
            url: '/patients',
            icon: icons['IconTypography'],
            breadcrumbs: false
        }
    ]
};
