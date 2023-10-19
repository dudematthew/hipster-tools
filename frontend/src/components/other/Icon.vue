<template>
    <svg-icon type="mdi" :path="path" :size="48"></svg-icon>
</template>


<script>
    /**
     * @see https://www.npmjs.com/package/@jamescoyle/vue-icon
     */
    import SvgIcon from '@jamescoyle/vue-icon'

    import {
        mdiFlask,
        mdiHelp,
        mdiBottleTonicSkull,
        mdiKeyboardBackspace,
    } from '@mdi/js';

    const icons = {
        Help: mdiHelp,
        Flask: mdiFlask,
        BottleTonickSkull: mdiBottleTonicSkull,
        KeyboardBackspace: mdiKeyboardBackspace,
    };

    export default {
        name: 'IconVue',
        components: {
            SvgIcon,
        },
        props: {
            iconName: {
                type: String,
                default: 'Help',
            },
        },
        data() {
            return {
                path: null,
            };
        },
        created() {
            this.path = icons[this.iconName];
        },
    };
</script>