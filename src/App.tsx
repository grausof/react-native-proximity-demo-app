import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {ScenarioRunner} from './scenarios/types';
import scenarios from './scenarios';

function TestScenario({
  scenario,
  title = scenario.name,
}: {
  scenario: ScenarioRunner;
  title: string;
}) {
  const [result, setResult] = React.useState<string | undefined>();
  React.useEffect(() => {
    setResult('READY');
  }, []);

  function run(runner: ScenarioRunner) {
    return async () => {
      setResult('⏱️');
      const [error, _result] = await runner();
      if (error) {
        setResult(`❌ ${JSON.stringify(error)}`);
      } else {
        setResult(_result);
      }
    };
  }

  return (
    <View>
      <Button title={title} onPress={run(scenario)} />
      <Text style={styles.title}>{result}</Text>
    </View>
  );
}

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <TestScenario title="Encode CBOR" scenario={scenarios.encodeCbor} />
      <TestScenario title="Decode CBOR" scenario={scenarios.decodeCbor} />
      <TestScenario
        title="Create and sign COSE"
        scenario={scenarios.createAndSignCose}
      />
      <TestScenario title="Verify COSE" scenario={scenarios.verifyCose} />
      <TestScenario title="JWT to COSE" scenario={scenarios.jwkToCose} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
