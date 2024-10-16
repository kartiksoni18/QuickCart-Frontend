import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

// for navigation between the screens
export const navigate = async (routeName: string, params?: object) => {
  navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
};

export const replace = async (routeName: string, params?: object) => {
  navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  }
};

// to remove the other screens from the stack and move to the mentioned route
export const resetAndNavigate = async (routeName: string) => {
  navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
      }),
    );
  }
};

export const goBack = async () => {
  navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
};

// to add new screen in the Stack
export const push = async (routeName: string, params?: object) => {
  navigationRef.isReady();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
};

// to prepare the navigation at the starting of the application`
export const prepareNavigation = async () => {
  navigationRef.isReady();
};
