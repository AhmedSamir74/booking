import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';
import { IBookingProps } from 'types';

const recommendedHotelsCollection =
  Config.RECOMMENDED_HOTELS_COLLECTION_NAME as string;
const reservationsCollection = Config.RESERVATION_COLLECTION_NAME as string;

class FirebaseController {
  constructor() {
    firestore().settings({ persistence: true });
  }
  private addDocument(collection: string, document: any) {
    return firestore().collection(collection).add(document);
  }

  private updateDocument(collection: string, document: any, attribute: any) {
    return firestore().collection(collection).doc(document).update(attribute);
  }

  private removeDocument(collectionName: string, id: string) {
    return firestore().collection(collectionName).doc(id).delete();
  }

  private getDocument(collection: string, documentID: string) {
    return firestore().collection(collection).doc(documentID).get();
  }

  filterDocuments({
    collection,
    filterAttribute,
    filterValue,
  }: {
    collection: string;
    filterAttribute: string;
    filterValue: any;
  }) {
    return firestore()
      .collection(collection)
      .orderBy(filterAttribute)
      .startAt(filterValue)
      .endAt(filterValue + '\uf8ff')
      .limit(20)
      .get();
  }

  getCollectionData({
    collectionName,
    orderBy,
    startAfter,
  }: {
    collectionName: string;
    orderBy?: { name: string; value: 'asc' | 'desc' };
    startAfter?: unknown;
  }) {
    const collectionRef = firestore().collection(collectionName).limit(20);
    if (orderBy?.name) {
      const reftOrderBy = collectionRef.orderBy(orderBy.name, orderBy.value);
      if (startAfter) {
        return reftOrderBy.startAfter(startAfter).get();
      }
      return reftOrderBy.get();
    } else {
      return collectionRef.get();
    }
  }

  onCollectionChange(collectionName: string, callBack: any) {
    return firestore()
      .collection(collectionName)
      .onSnapshot(
        QuerySnapshot => {
          callBack(QuerySnapshot.docs);
        },
        error => {
          console.error(error);
        },
      );
  }

  onCollectionChangeByCondition(
    collectionName: string,
    filterAttribute: string,
    filterValue: any,
    callBack: any,
  ) {
    return firestore()
      .collection(collectionName)
      .where(filterAttribute, '==', filterValue)
      .onSnapshot(
        QuerySnapshot => {
          callBack(QuerySnapshot.docs);
        },
        error => {
          console.error('==>', error);
        },
      );
  }

  getHotels() {
    return this.getCollectionData({
      collectionName: recommendedHotelsCollection,
      orderBy: {
        name: 'name',
        value: 'asc',
      },
    });
  }

  createReservation(reservation: IBookingProps) {
    return this.addDocument(reservationsCollection, reservation);
  }

  getUserBookings(userId: string) {
    return this.filterDocuments({
      collection: reservationsCollection,
      filterAttribute: 'userId',
      filterValue: userId,
    });
  }
}

export default FirebaseController;
