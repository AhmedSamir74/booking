import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import {
  CustomLayout,
  EmptyList,
  ErrorCard,
  Skelton,
} from '@components/common';
import { COLORS } from '@assets/theme/theme';

import FirebaseController from '@utils/FirebaseController';

import styles from './styles';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { IGetDocuemtnsParams } from 'types';

export const HomeScreen = () => {
  const firebaseController = useRef(new FirebaseController()).current;

  const [students, setStudents] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);

  const [lastDocument, setLastDocument] =
    useState<FirebaseFirestoreTypes.DocumentData>();

  const [booleans, setBooleans] = useState({
    isLoading: true,
    isRefreshing: false,
    isListEnded: false,
  });

  const [loadingError, setLoadingError] = useState('');

  const onBooleanChange = (key: keyof typeof booleans, value: boolean) =>
    setBooleans(prevState => ({
      ...prevState,
      [key]: value,
    }));

  const getStudents = async (params?: IGetDocuemtnsParams) => {
    if (params?.isPaginating && booleans.isListEnded) {
      return;
    }

    const lastDoc = params?.isPaginating ? lastDocument : undefined;
    const query = params?.isSearching ? params?.studentName : undefined;
    firebaseController
      .getStudents(query, lastDoc)
      .then(async querySnapshot => {
        // In filtration
        if (!params || params?.isSearching || params?.isRefreshing) {
          setStudents(querySnapshot.docs);
        } else if (params?.isPaginating) {
          // if paginating append the new students to the current students list
          setStudents(prevState => [...prevState, ...querySnapshot.docs]);
        }
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        // for hiding the spinner under the list
        onBooleanChange('isListEnded', !querySnapshot.docs.length);
      })
      .catch((error: any) => {
        setLoadingError("Can't Load data, Please try again");
        return error;
      })
      .finally(() => {
        onBooleanChange('isLoading', false);
      });
  };

  const getListEmptyComponent = () => {
    return booleans.isLoading ? <Skelton /> : <EmptyList />;
  };

  const onRefresh = () => {
    onBooleanChange('isRefreshing', true);

    // the set timeout is for better user experience in refreshing
    setTimeout(() => {
      getStudents().then(() => {
        onBooleanChange('isRefreshing', false);
      });
    }, 1500);
  };

  const renderListFooterComp = () =>
    !booleans.isListEnded ? (
      <ActivityIndicator
        size="small"
        color={COLORS.primary}
        style={styles.footerLoader}
      />
    ) : null;

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingError) {
    <ErrorCard>{loadingError}</ErrorCard>;
  }

  return (
    <CustomLayout style={styles.layout}>
      <FlatList
        refreshing={booleans.isRefreshing}
        onRefresh={onRefresh}
        data={[]}
        renderItem={() => <></>}
        ListEmptyComponent={getListEmptyComponent}
        ListFooterComponent={renderListFooterComp}
        onEndReachedThreshold={0.3}
        onEndReached={() => getStudents({ isPaginating: true })}
      />
    </CustomLayout>
  );
};
