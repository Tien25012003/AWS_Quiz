import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerUSER = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<USER, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nameImage?: number | null;
  readonly name?: string | null;
  readonly score?: number | null;
  readonly time?: number | null;
  readonly numberCorrect?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUSER = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<USER, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nameImage?: number | null;
  readonly name?: string | null;
  readonly score?: number | null;
  readonly time?: number | null;
  readonly numberCorrect?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type USER = LazyLoading extends LazyLoadingDisabled ? EagerUSER : LazyUSER

export declare const USER: (new (init: ModelInit<USER>) => USER) & {
  copyOf(source: USER, mutator: (draft: MutableModel<USER>) => MutableModel<USER> | void): USER;
}