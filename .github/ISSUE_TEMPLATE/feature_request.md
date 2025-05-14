name: Feature request
about: Feature request
title: "[Feature] "
labels: enhancement
assignees: []

body:
  - type: textarea
    id: description
    attributes:
      label: "설명"
      description: "이슈에 대한 상세 설명을 작성하세요."
      placeholder: "어떤 기능을 추가하려고 하나요?"
    validations:
      required: true
    
  - type: textarea
    id: feature_list
    attributes:
      label: "기능 목록"
      description: "기능 목록을 작성하세요."
      value: |
        [ ] 
        [ ] 
        [ ]
        ...
    validations:
      required: false
