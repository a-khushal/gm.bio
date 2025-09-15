/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/profile_program.json`.
 */
export type ProfileProgram = {
  "address": "7EiXfcfkDh4eQWTWhrUNydZroe6sQiZzxryfbSwS1ddf",
  "metadata": {
    "name": "profileProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createProfile",
      "discriminator": [
        225,
        205,
        234,
        143,
        17,
        186,
        50,
        220
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "usernameRegistry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "username"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "bio",
          "type": "string"
        },
        {
          "name": "links",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "updateProfile",
      "discriminator": [
        98,
        67,
        99,
        206,
        86,
        115,
        175,
        1
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "bio",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "links",
          "type": {
            "option": {
              "vec": "string"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userProfile",
      "discriminator": [
        32,
        37,
        119,
        205,
        179,
        180,
        13,
        194
      ]
    },
    {
      "name": "usernameRegistry",
      "discriminator": [
        145,
        217,
        207,
        126,
        35,
        114,
        138,
        18
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "usernameTooLong",
      "msg": "Username too long"
    },
    {
      "code": 6001,
      "name": "bioTooLong",
      "msg": "Bio too long"
    },
    {
      "code": 6002,
      "name": "tooManyLinks",
      "msg": "Too many links"
    },
    {
      "code": 6003,
      "name": "linkTooLong",
      "msg": "Link too long"
    },
    {
      "code": 6004,
      "name": "unauthorized",
      "msg": "unauthorized"
    }
  ],
  "types": [
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "links",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    },
    {
      "name": "usernameRegistry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
