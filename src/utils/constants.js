export const EXPO_PROJECT_ID = 'cc10a9d8-71f7-4c7a-bd2e-8d2db49c2e6d';

export const GARDEN_TYPE = [
    {
        optionText: 'Indoor room',
        optionMapping: 0,
        location: 'Indoor',
        wateringFrequency: 3,
        fertilisingFrequency: 3,
        optionDetail: 'At least 8h of full sun',
        defaultImage: 'https://firebasestorage.googleapis.com/v0/b/plantapp-ca700.appspot.com/o/images%2Findoor-garden.jpg?alt=media&token=aec22247-642f-477d-bf48-1b7cfa83e101'
    },
    {
        optionText: 'Raised garden bed',
        optionMapping: 1,
        location: 'Outdoor',
        wateringFrequency: 3,
        fertilisingFrequency: 3,
        weedingFrequency: 20,
        optionDetail: 'At least 8h of full sun',
        defaultImage: 'https://firebasestorage.googleapis.com/v0/b/plantapp-ca700.appspot.com/o/images%2Fgarden-bed.jpg?alt=media&token=b23933bb-e3f7-43e1-87bf-d1a7a223246d'
    },
    {
        optionText: 'Pot garden',
        optionMapping: 2,
        location: 'Outdoor',
        wateringFrequency: 3,
        fertilisingFrequency: 3,
        weedingFrequency: 30,
        optionDetail: 'At least 8h of full sun',
        defaultImage: 'https://firebasestorage.googleapis.com/v0/b/plantapp-ca700.appspot.com/o/images%2Fpot-garden.jpg?alt=media&token=02dedd77-1f03-4a80-ab88-ba1dd1feda0f'
    },
    {
        optionText: 'In-ground bed',
        optionMapping: 4,
        location: 'Outdoor',
        wateringFrequency: 3,
        fertilisingFrequency: 3,
        weedingFrequency: 20,
        optionDetail: 'At least 8h of full sun',
        defaultImage: 'https://firebasestorage.googleapis.com/v0/b/plantapp-ca700.appspot.com/o/images%2Fvegetable-garden.jpg?alt=media&token=eb696812-93ce-4bd7-96a5-35a8e12c31da'
    },
    {
        optionText: 'Vertical garden',
        optionMapping: 5,
        location: 'Outdoor',
        wateringFrequency: 3,
        fertilisingFrequency: 3,
        weedingFrequency: 20,
        optionDetail: 'At least 8h of full sun',
        defaultImage: 'https://firebasestorage.googleapis.com/v0/b/plantapp-ca700.appspot.com/o/images%2Findoor-garden.jpg?alt=media&token=aec22247-642f-477d-bf48-1b7cfa83e101'
    }];

export const LIGHTING = [
    {
        optionText: 'Full Sun',
        optionMapping: 0,
        optionDetail: 'At least 8h of full sun',
    },
    {
        optionText: 'Part Sun',
        optionMapping: 1,
        optionDetail: 'Part Sun',
    },
    {
        optionText: 'Shade',
        optionMapping: 2,
        optionDetail: 'Shade',
    },
    {
        optionText: 'Dim',
        optionMapping: 3,
        optionDetail: 'Indoors or outdoors with very little light',
    },
];


export const CLIMATE_ZONES = [
    {
        optionText: 'Tropical',
        optionMapping: 0,
    },
    {
        optionText: 'Arid',
        optionMapping: 1,
    },
    {
        optionText: 'Subtropical',
        optionMapping: 2,
    },
    {
        optionText: 'Temperate',
        optionMapping: 3,
    },
    {
        optionText: 'Cool',
        optionMapping: 4,
    }
];

export const GROWING_STAGES = [
    {
        optionText: 'Seed',
        optionMapping: 0,
        optionImage: ''
    },
    {
        optionText: 'Seedling',
        optionMapping: 1,
        optionImage: ''
    },
    {
        optionText: 'Mature Plant',
        optionMapping: 2,
        optionImage: ''
    },
];