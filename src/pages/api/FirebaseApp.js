/**
 * @fileoverview This file represets the the configuration for the app's firebase connection. The API key is hidden for safety
 */

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseAPI";

export const firebaseApp = initializeApp(firebaseConfig);