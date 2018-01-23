import { Main } from './main';

export const bootstrap = () => {
    new Main()
        .init()
        .start();
};

bootstrap();
