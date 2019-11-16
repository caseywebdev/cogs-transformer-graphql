import i0 from "./my-fragment";
import i1 from "./my-second-fragment";
export default {
  kind: "Document",
  definitions: [].concat(
    i0.definitions,
    i1.definitions,
    [
      {
        "kind": "OperationDefinition",
        "operation": "query",
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "foo"
              },
              "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                  {
                    "kind": "Field",
                    "name": {
                      "kind": "Name",
                      "value": "id"
                    }
                  },
                  {
                    "kind": "FragmentSpread",
                    "name": {
                      "kind": "Name",
                      "value": "MyFragment"
                    }
                  },
                  {
                    "kind": "FragmentSpread",
                    "name": {
                      "kind": "Name",
                      "value": "MySecondFragment"
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  )
};
