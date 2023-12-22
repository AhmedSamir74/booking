import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';
import { IStudent } from 'types';

const STUDENTS_COLLECTION_NAME = Config.STUDENTS_COLLECTION_NAME || '';

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

  filterDocuments(
    collection: string,
    filterAttribute: string,
    filterValue: any,
  ) {
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

  /** STUDENTS **/
  addStudent(student: IStudent) {
    return this.addDocument(STUDENTS_COLLECTION_NAME, student);
  }

  updateStudent(studentId: string, student: IStudent) {
    return this.updateDocument(STUDENTS_COLLECTION_NAME, studentId, student);
  }

  getStudents(studentName?: string, startAfter?: unknown) {
    if (studentName) {
      return this.getStudentsByName(studentName);
    } else {
      return this.getCollectionData({
        collectionName: STUDENTS_COLLECTION_NAME,
        orderBy: {
          name: 'firstName',
          value: 'asc',
        },
        startAfter,
      });
    }
  }

  getStudentsByName(name: string) {
    return this.filterDocuments(STUDENTS_COLLECTION_NAME, 'firstName', name);
  }

  getStudentData(studentId: string) {
    return this.getDocument(STUDENTS_COLLECTION_NAME, studentId);
  }
}

export default FirebaseController;
