import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar' //alterando o nome do Main para DevRadar
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Github Profile'
            }
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#FFF',
            headerBackTitleVisible: false, //removendo o texto de dev radar no botao de voltar na pagina profile do github
            headerStyle: {
                backgroundColor: '#7d40e7',
            }
        }
    })
);

export default Routes;