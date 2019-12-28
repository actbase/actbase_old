# Button

기본적으로 사용하는 Button객체들

```
<Button 
    forceInset={false}
    disabled={false}
    type={'solid' || 'link' || null}
    size={'xs' || 'default' || 'lg'}
    style={{ color: '#F00' }}
>
    Submit...
</Button>
```

### 해당 버튼의 기능은 다음과 같음
- 바닥에 붙일 경우 알아서 SafeArea적용
- 다중 클릭 방지
- 자동 로딩 표시
- 스타일링 처리
- actbase 연계 처리 


### 버튼에 대한 Props
|PropName|Values|Description|
|--------|------|-----------|
|forceInset|boolean|세이프어레어 모드로 사용여부|
|disabled|boolean|사용여부에 따라 막고 뭐하고 하기|
|onPress|function|해당 펑션이 Promise면 로딩띠우고 200ms의 텀을 두어서 연타막기|
|type|solid, link, custom|해당 클래스에 맞춰서 스타일을 반영해줌|
|size|xs, default,lg|해당 각각 별로 높이를 잡음|
|style|object|버튼스타일잡기|
|...others| |그외 TouchableNoFeedback과 동일함|


