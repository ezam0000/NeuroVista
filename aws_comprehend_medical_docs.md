//sample api call and response

// API CALL

{
    "Text": "Pt is 87 yo woman, highschool teacher with past medical history that includes   - status post cardiac catheterization in April 2019.She presents today with palpitations and chest pressure.HPI : Sleeping trouble on present dosage of Clonidine. Severe Rash  on face and leg, slightly itchy.Meds : Vyvanse 50 mgs po at breakfast daily,             Clonidine 0.2 mgs -- 1 and 1 / 2 tabs po qhs HEENT : Boggy inferior turbinates, No oropharyngeal lesion.Lungs : clear.Heart : Regular rhythm.Skin :  Mild erythematous eruption to hairline.Follow-up as scheduled"
}

// API RESPONSE

{
    "Entities": [
        {
            "Id": 43,
            "BeginOffset": 6,
            "EndOffset": 8,
            "Score": 0.9997414946556091,
            "Text": "87",
            "Category": "PROTECTED_HEALTH_INFORMATION",
            "Type": "AGE",
            "Traits": []
        },
        {
            "Id": 1,
            "BeginOffset": 12,
            "EndOffset": 17,
            "Score": 0.8435389995574951,
            "Text": "woman",
            "Category": "BEHAVIORAL_ENVIRONMENTAL_SOCIAL",
            "Type": "GENDER",
            "Traits": []
        },
        {
            "Id": 44,
            "BeginOffset": 19,
            "EndOffset": 37,
            "Score": 0.20282717049121857,
            "Text": "highschool teacher",
            "Category": "PROTECTED_HEALTH_INFORMATION",
            "Type": "PROFESSION",
            "Traits": []
        },
        {
            "Id": 2,
            "BeginOffset": 83,
            "EndOffset": 94,
            "Score": 0.7950295805931091,
            "Text": "status post",
            "Category": "TIME_EXPRESSION",
            "Type": "TIME_TO_PROCEDURE_NAME",
            "Traits": [],
            "Attributes": [
                {
                    "Type": "PROCEDURE_NAME",
                    "Score": 0.821601390838623,
                    "RelationshipScore": 0.7814922332763672,
                    "RelationshipType": "OVERLAP",
                    "Id": 4,
                    "BeginOffset": 95,
                    "EndOffset": 118,
                    "Text": "cardiac catheterization",
                    "Category": "TEST_TREATMENT_PROCEDURE",
                    "Traits": [
                        {
                            "Name": "PAST_HISTORY",
                            "Score": 0.779019296169281
                        }
                    ]
                }
            ]
        },
        {
            "Id": 3,
            "BeginOffset": 95,
            "EndOffset": 102,
            "Score": 0.7172441482543945,
            "Text": "cardiac",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        },
        {
            "Id": 4,
            "BeginOffset": 95,
            "EndOffset": 118,
            "Score": 0.821601390838623,
            "Text": "cardiac catheterization",
            "Category": "TEST_TREATMENT_PROCEDURE",
            "Type": "PROCEDURE_NAME",
            "Traits": [
                {
                    "Name": "PAST_HISTORY",
                    "Score": 0.779019296169281
                }
            ]
        },
        {
            "Id": 5,
            "BeginOffset": 122,
            "EndOffset": 132,
            "Score": 0.5971075296401978,
            "Text": "April 2019",
            "Category": "TIME_EXPRESSION",
            "Type": "TIME_TO_PROCEDURE_NAME",
            "Traits": [],
            "Attributes": [
                {
                    "Type": "PROCEDURE_NAME",
                    "Score": 0.821601390838623,
                    "RelationshipScore": 0.5692254304885864,
                    "RelationshipType": "OVERLAP",
                    "Id": 4,
                    "BeginOffset": 95,
                    "EndOffset": 118,
                    "Text": "cardiac catheterization",
                    "Category": "TEST_TREATMENT_PROCEDURE",
                    "Traits": [
                        {
                            "Name": "PAST_HISTORY",
                            "Score": 0.779019296169281
                        }
                    ]
                }
            ]
        },
        {
            "Id": 45,
            "BeginOffset": 122,
            "EndOffset": 132,
            "Score": 0.9998505115509033,
            "Text": "April 2019",
            "Category": "PROTECTED_HEALTH_INFORMATION",
            "Type": "DATE",
            "Traits": []
        },
        {
            "Id": 6,
            "BeginOffset": 147,
            "EndOffset": 152,
            "Score": 0.6603351831436157,
            "Text": "today",
            "Category": "TIME_EXPRESSION",
            "Type": "TIME_TO_DX_NAME",
            "Traits": [],
            "Attributes": [
                {
                    "Type": "DX_NAME",
                    "Score": 0.9350614547729492,
                    "RelationshipScore": 0.6270833611488342,
                    "RelationshipType": "OVERLAP",
                    "Id": 7,
                    "BeginOffset": 158,
                    "EndOffset": 170,
                    "Text": "palpitations",
                    "Category": "MEDICAL_CONDITION",
                    "Traits": [
                        {
                            "Name": "SYMPTOM",
                            "Score": 0.9596198797225952
                        }
                    ]
                }
            ]
        },
        {
            "Id": 6,
            "BeginOffset": 147,
            "EndOffset": 152,
            "Score": 0.6603351831436157,
            "Text": "today",
            "Category": "TIME_EXPRESSION",
            "Type": "TIME_TO_DX_NAME",
            "Traits": [],
            "Attributes": [
                {
                    "Type": "DX_NAME",
                    "Score": 0.9584784507751465,
                    "RelationshipScore": 0.6270833611488342,
                    "RelationshipType": "OVERLAP",
                    "Id": 9,
                    "BeginOffset": 175,
                    "EndOffset": 189,
                    "Text": "chest pressure",
                    "Category": "MEDICAL_CONDITION",
                    "Traits": [
                        {
                            "Name": "SYMPTOM",
                            "Score": 0.9817302823066711
                        }
                    ]
                }
            ]
        },
        {
            "Id": 7,
            "BeginOffset": 158,
            "EndOffset": 170,
            "Score": 0.9350614547729492,
            "Text": "palpitations",
            "Category": "MEDICAL_CONDITION",
            "Type": "DX_NAME",
            "Traits": [
                {
                    "Name": "SYMPTOM",
                    "Score": 0.9596198797225952
                }
            ]
        },
        {
            "Id": 8,
            "BeginOffset": 175,
            "EndOffset": 180,
            "Score": 0.90631103515625,
            "Text": "chest",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        },
        {
            "Id": 9,
            "BeginOffset": 175,
            "EndOffset": 189,
            "Score": 0.9584784507751465,
            "Text": "chest pressure",
            "Category": "MEDICAL_CONDITION",
            "Type": "DX_NAME",
            "Traits": [
                {
                    "Name": "SYMPTOM",
                    "Score": 0.9817302823066711
                }
            ],
            "Attributes": [
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.90631103515625,
                    "RelationshipScore": 0.9234480857849121,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 8,
                    "BeginOffset": 175,
                    "EndOffset": 180,
                    "Text": "chest",
                    "Category": "ANATOMY",
                    "Traits": []
                }
            ]
        },
        {
            "Id": 10,
            "BeginOffset": 197,
            "EndOffset": 213,
            "Score": 0.9201511740684509,
            "Text": "Sleeping trouble",
            "Category": "MEDICAL_CONDITION",
            "Type": "DX_NAME",
            "Traits": [
                {
                    "Name": "SYMPTOM",
                    "Score": 0.9596198797225952
                }
            ]
        },
        {
            "Id": 11,
            "BeginOffset": 235,
            "EndOffset": 244,
            "Score": 0.7613970637321472,
            "Text": "Clonidine",
            "Category": "MEDICATION",
            "Type": "GENERIC_NAME",
            "Traits": []
        },
        {
            "Id": 13,
            "BeginOffset": 253,
            "EndOffset": 257,
            "Score": 0.9584784507751465,
            "Text": "Rash",
            "Category": "MEDICAL_CONDITION",
            "Type": "DX_NAME",
            "Traits": [
                {
                    "Name": "SYMPTOM",
                    "Score": 0.9817302823066711
                }
            ],
            "Attributes": [
                {
                    "Type": "QUALITY",
                    "Score": 0.821601390838623,
                    "RelationshipScore": 0.8031880259513855,
                    "RelationshipType": "QUALITY",
                    "Id": 12,
                    "BeginOffset": 246,
                    "EndOffset": 252,
                    "Text": "Severe",
                    "Category": "MEDICAL_CONDITION",
                    "Traits": []
                },
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.877546489238739,
                    "RelationshipScore": 0.7552722692489624,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 14,
                    "BeginOffset": 262,
                    "EndOffset": 266,
                    "Text": "face",
                    "Category": "ANATOMY",
                    "Traits": []
                },
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.877546489238739,
                    "RelationshipScore": 0.8219892978668213,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 15,
                    "BeginOffset": 271,
                    "EndOffset": 274,
                    "Text": "leg",
                    "Category": "ANATOMY",
                    "Traits": []
                }
            ]
        },
        {
            "Id": 14,
            "BeginOffset": 262,
            "EndOffset": 266,
            "Score": 0.877546489238739,
            "Text": "face",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        },
        {
            "Id": 15,
            "BeginOffset": 271,
            "EndOffset": 274,
            "Score": 0.877546489238739,
            "Text": "leg",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        },
        {
            "Id": 17,
            "BeginOffset": 285,
            "EndOffset": 290,
            "Score": 0.90631103515625,
            "Text": "itchy",
            "Category": "MEDICAL_CONDITION",
            "Type": "DX_NAME",
            "Traits": [
                {
                    "Name": "SYMPTOM",
                    "Score": 0.9405226111412048
                }
            ],
            "Attributes": [
                {
                    "Type": "QUALITY",
                    "Score": 0.7950295805931091,
                    "RelationshipScore": 0.7552722692489624,
                    "RelationshipType": "QUALITY",
                    "Id": 16,
                    "BeginOffset": 276,
                    "EndOffset": 284,
                    "Text": "slightly",
                    "Category": "MEDICAL_CONDITION",
                    "Traits": []
                }
            ]
        },
        {
            "Id": 18,
            "BeginOffset": 292,
            "EndOffset": 296,
            "Score": 0.7613970637321472,
            "Text": "Meds",
            "Category": "TEST_TREATMENT_PROCEDURE",
            "Type": "TREATMENT_NAME",
            "Traits": []
        },
        {
            "Id": 19,
            "BeginOffset": 299,
            "EndOffset": 306,
            "Score": 0.8435389995574951,
            "Text": "Vyvanse",
            "Category": "MEDICATION",
            "Type": "BRAND_NAME",
            "Traits": [],
            "Attributes": [
                {
                    "Type": "DOSAGE",
                    "Score": 0.8435389995574951,
                    "RelationshipScore": 0.8534350991249084,
                    "RelationshipType": "DOSAGE",
                    "Id": 20,
                    "BeginOffset": 307,
                    "EndOffset": 313,
                    "Text": "50 mgs",
                    "Category": "MEDICATION",
                    "Traits": []
                },
                {
                    "Type": "ROUTE_OR_MODE",
                    "Score": 0.877546489238739,
                    "RelationshipScore": 0.8672217726707458,
                    "RelationshipType": "ROUTE_OR_MODE",
                    "Id": 21,
                    "BeginOffset": 314,
                    "EndOffset": 316,
                    "Text": "po",
                    "Category": "MEDICATION",
                    "Traits": []
                },
                {
                    "Type": "FREQUENCY",
                    "Score": 0.7613970637321472,
                    "RelationshipScore": 0.7552722692489624,
                    "RelationshipType": "FREQUENCY",
                    "Id": 22,
                    "BeginOffset": 317,
                    "EndOffset": 335,
                    "Text": "at breakfast daily",
                    "Category": "MEDICATION",
                    "Traits": []
                }
            ]
        },
        {
            "Id": 23,
            "BeginOffset": 350,
            "EndOffset": 359,
            "Score": 0.7950295805931091,
            "Text": "Clonidine",
            "Category": "MEDICATION",
            "Type": "GENERIC_NAME",
            "Traits": [],
            "Attributes": [
                {
                    "Type": "STRENGTH",
                    "Score": 0.5971075296401978,
                    "RelationshipScore": 0.6270833611488342,
                    "RelationshipType": "STRENGTH",
                    "Id": 24,
                    "BeginOffset": 360,
                    "EndOffset": 367,
                    "Text": "0.2 mgs",
                    "Category": "MEDICATION",
                    "Traits": []
                },
                {
                    "Type": "DOSAGE",
                    "Score": 0.5971075296401978,
                    "RelationshipScore": 0.5692254304885864,
                    "RelationshipType": "DOSAGE",
                    "Id": 25,
                    "BeginOffset": 371,
                    "EndOffset": 382,
                    "Text": "1 and 1 / 2",
                    "Category": "MEDICATION",
                    "Traits": []
                },
                {
                    "Type": "FORM",
                    "Score": 0.7950295805931091,
                    "RelationshipScore": 0.6270833611488342,
                    "RelationshipType": "FORM",
                    "Id": 26,
                    "BeginOffset": 383,
                    "EndOffset": 387,
                    "Text": "tabs",
                    "Category": "MEDICATION",
                    "Traits": []
                },
                {
                    "Type": "ROUTE_OR_MODE",
                    "Score": 0.821601390838623,
                    "RelationshipScore": 0.8219892978668213,
                    "RelationshipType": "ROUTE_OR_MODE",
                    "Id": 27,
                    "BeginOffset": 388,
                    "EndOffset": 390,
                    "Text": "po",
                    "Category": "MEDICATION",
                    "Traits": []
                },
                {
                    "Type": "FREQUENCY",
                    "Score": 0.877546489238739,
                    "RelationshipScore": 0.8031880259513855,
                    "RelationshipType": "FREQUENCY",
                    "Id": 28,
                    "BeginOffset": 391,
                    "EndOffset": 394,
                    "Text": "qhs",
                    "Category": "MEDICATION",
                    "Traits": []
                }
            ]
        },
        {
            "Id": 29,
            "BeginOffset": 396,
            "EndOffset": 401,
            "Score": 0.6603351831436157,
            "Text": "HEENT",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        },
        {
            "Id": 30,
            "BeginOffset": 404,
            "EndOffset": 429,
            "Score": 0.821601390838623,
            "Text": "Boggy inferior turbinates",
            "Category": "MEDICAL_CONDITION",
            "Type": "DX_NAME",
            "Traits": [
                {
                    "Name": "SIGN",
                    "Score": 0.5752319693565369
                }
            ],
            "Attributes": [
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.6603351831436157,
                    "RelationshipScore": 0.6270833611488342,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 29,
                    "BeginOffset": 396,
                    "EndOffset": 401,
                    "Text": "HEENT",
                    "Category": "ANATOMY",
                    "Traits": []
                },
                {
                    "Type": "DIRECTION",
                    "Score": 0.7172441482543945,
                    "RelationshipScore": 0.6795811653137207,
                    "RelationshipType": "DIRECTION",
                    "Id": 31,
                    "BeginOffset": 410,
                    "EndOffset": 418,
                    "Text": "inferior",
                    "Category": "ANATOMY",
                    "Traits": []
                },
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.8617406487464905,
                    "RelationshipScore": 0.6795811653137207,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 32,
                    "BeginOffset": 410,
                    "EndOffset": 429,
                    "Text": "inferior turbinates",
                    "Category": "ANATOMY",
                    "Traits": []
                }
            ]
        },
        {
            "Id": 32,
            "BeginOffset": 410,
            "EndOffset": 429,
            "Score": 0.8617406487464905,
            "Text": "inferior turbinates",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        },
        {
            "Id": 33,
            "BeginOffset": 434,
            "EndOffset": 447,
            "Score": 0.8435389995574951,
            "Text": "oropharyngeal",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        },
        {
            "Id": 34,
            "BeginOffset": 434,
            "EndOffset": 454,
            "Score": 0.821601390838623,
            "Text": "oropharyngeal lesion",
            "Category": "MEDICAL_CONDITION",
            "Type": "DX_NAME",
            "Traits": [
                {
                    "Name": "NEGATION",
                    "Score": 0.8203471899032593
                },
                {
                    "Name": "SIGN",
                    "Score": 0.8530592322349548
                }
            ],
            "Attributes": [
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.6603351831436157,
                    "RelationshipScore": 0.6795811653137207,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 29,
                    "BeginOffset": 396,
                    "EndOffset": 401,
                    "Text": "HEENT",
                    "Category": "ANATOMY",
                    "Traits": []
                },
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.8435389995574951,
                    "RelationshipScore": 0.8386837244033813,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 33,
                    "BeginOffset": 434,
                    "EndOffset": 447,
                    "Text": "oropharyngeal",
                    "Category": "ANATOMY",
                    "Traits": []
                }
            ]
        },
        {
            "Id": 35,
            "BeginOffset": 456,
            "EndOffset": 461,
            "Score": 0.821601390838623,
            "Text": "Lungs",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        },
        {
            "Id": 36,
            "BeginOffset": 464,
            "EndOffset": 469,
            "Score": 0.7172441482543945,
            "Text": "clear",
            "Category": "MEDICAL_CONDITION",
            "Type": "DX_NAME",
            "Traits": [
                {
                    "Name": "SIGN",
                    "Score": 0.7299559712409973
                }
            ],
            "Attributes": [
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.821601390838623,
                    "RelationshipScore": 0.8219892978668213,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 35,
                    "BeginOffset": 456,
                    "EndOffset": 461,
                    "Text": "Lungs",
                    "Category": "ANATOMY",
                    "Traits": []
                }
            ]
        },
        {
            "Id": 37,
            "BeginOffset": 471,
            "EndOffset": 476,
            "Score": 0.8617406487464905,
            "Text": "Heart",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        },
        {
            "Id": 38,
            "BeginOffset": 479,
            "EndOffset": 493,
            "Score": 0.9201511740684509,
            "Text": "Regular rhythm",
            "Category": "MEDICAL_CONDITION",
            "Type": "DX_NAME",
            "Traits": [
                {
                    "Name": "SIGN",
                    "Score": 0.9214484095573425
                }
            ],
            "Attributes": [
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.8617406487464905,
                    "RelationshipScore": 0.8534350991249084,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 37,
                    "BeginOffset": 471,
                    "EndOffset": 476,
                    "Text": "Heart",
                    "Category": "ANATOMY",
                    "Traits": []
                }
            ]
        },
        {
            "Id": 39,
            "BeginOffset": 495,
            "EndOffset": 499,
            "Score": 0.7950295805931091,
            "Text": "Skin",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        },
        {
            "Id": 41,
            "BeginOffset": 508,
            "EndOffset": 541,
            "Score": 0.5971075296401978,
            "Text": "erythematous eruption to hairline",
            "Category": "MEDICAL_CONDITION",
            "Type": "DX_NAME",
            "Traits": [
                {
                    "Name": "SIGN",
                    "Score": 0.5296252369880676
                }
            ],
            "Attributes": [
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.7950295805931091,
                    "RelationshipScore": 0.7814922332763672,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 39,
                    "BeginOffset": 495,
                    "EndOffset": 499,
                    "Text": "Skin",
                    "Category": "ANATOMY",
                    "Traits": []
                },
                {
                    "Type": "QUALITY",
                    "Score": 0.8435389995574951,
                    "RelationshipScore": 0.8386837244033813,
                    "RelationshipType": "QUALITY",
                    "Id": 40,
                    "BeginOffset": 503,
                    "EndOffset": 507,
                    "Text": "Mild",
                    "Category": "MEDICAL_CONDITION",
                    "Traits": []
                },
                {
                    "Type": "SYSTEM_ORGAN_SITE",
                    "Score": 0.7613970637321472,
                    "RelationshipScore": 0.5692254304885864,
                    "RelationshipType": "SYSTEM_ORGAN_SITE",
                    "Id": 42,
                    "BeginOffset": 533,
                    "EndOffset": 541,
                    "Text": "hairline",
                    "Category": "ANATOMY",
                    "Traits": []
                }
            ]
        },
        {
            "Id": 42,
            "BeginOffset": 533,
            "EndOffset": 541,
            "Score": 0.7613970637321472,
            "Text": "hairline",
            "Category": "ANATOMY",
            "Type": "SYSTEM_ORGAN_SITE",
            "Traits": []
        }
    ],
    "UnmappedAttributes": [
        {
            "Type": "ANATOMY",
            "Attribute": {
                "Type": "DIRECTION",
                "Score": 0.7172441482543945,
                "Id": 31,
                "BeginOffset": 410,
                "EndOffset": 418,
                "Text": "inferior",
                "Category": "ANATOMY",
                "Traits": []
            }
        }
    ],
    "ModelVersion": "3.0.0"
}