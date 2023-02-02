/**
 * @fileoverview This file represets the the configuration for the app's firebase connection 
 */

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseAPI";

export const firebaseApp = initializeApp(firebaseConfig);