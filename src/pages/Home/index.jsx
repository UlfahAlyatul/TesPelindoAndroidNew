import { StyleSheet, Text, View, TextInput,Button,KeyboardAvoidingView, SafeAreaView,
    ScrollView,
    StatusBar,Platform ,TouchableWithoutFeedback,Keyboard} from 'react-native'
import React, { useEffect } from 'react'
import { useState,useCallback } from 'react';
const Home = () => {
    const [negara, setNegara] = useState('');
    const [kdnegara, setkdnegara] = useState('');
    const [pelabuhan, setPelabuhan] = useState('');
    const [barang, setBarang] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [harga, setHarga] = useState('');
    const [tarifBea, setTarifBea] = useState('');
    const [total, setTotal] = useState('');
      
    useEffect(() => {
        const fetchDataNegara = async () => {
            if (negara?.length === 3) {
              try {
                const response = await fetch(
                  `https://insw-dev.ilcs.co.id/my/n/negara?ur_negara=${negara}`
                );
                const json = await response.json();
                console.log(json);
                if (json?.data && json.data.length > 0) {
                    setNegara(json.data[0].ur_negara);
                    setkdnegara(json.data[0].kd_negara);
                } else {
                  setNegara('');
                  setkdnegara('');
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              } finally {
              }
            }
        };
        fetchDataNegara();
    }, [negara])


    useEffect(() => {
        const fetchDataPelabuhan = async () => {
            if (pelabuhan?.length === 3) {
              try {
                const response = await fetch(
                  `https://insw-dev.ilcs.co.id/my/n/pelabuhan?kd_negara=${kdnegara}&ur_pelabuhan=${pelabuhan}`
                );
                const json = await response.json();

                if (json?.data && json.data.length > 0) {
                    setPelabuhan(json.data[0].ur_pelabuhan);
                } else {
                  setPelabuhan('');
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              } finally {
              }
            }
        }
        fetchDataPelabuhan();
    }, [pelabuhan])

    useEffect(() => {
        const fetchDataBarang = async () => {
            if (barang?.length === 8) {
              try {
                const response = await fetch(
                  `https://insw-dev.ilcs.co.id/my/n/barang?hs_code=${barang}`
                );
                const json = await response.json();
                console.log(json);
                if (json?.data && json.data.length > 0) {
                    setKeterangan(json.data[0].sub_header +' , '+ json.data[0].uraian_id);
                } else {
                    setKeterangan('');
                }
                const response2 = await fetch(
                    `https://insw-dev.ilcs.co.id/my/n/tarif?hs_code=${barang}`
                );
                const json2 = await response2.json();
                if (json2?.data && json2.data.length > 0) {
                    setTarifBea(json2.data[0].bm);
                }

              } catch (error) {
              } finally {
             
              }
            }else{
                setKeterangan('');
                setTarifBea('');
            }
        }
        fetchDataBarang();
    }, [barang])

    useEffect(() => {
        hitung();
    }, [harga])
    const hitung = () => {
        let total = parseFloat(harga) * parseFloat(tarifBea) / 100;
        setTotal(total.toString());
    }
    
   const resetForm = useCallback(() => {
        setNegara('');
        setPelabuhan('');
        setBarang('');
        setKeterangan('');
        setHarga('');
        setTarifBea('');
        setTotal('');
    }, [])
    
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100} 
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.formContent}>
                <View style={styles.formcontrol}>
                    <Text>Negara</Text>
                    <TextInput style={styles.input} placeholder="Negara" value={negara} onChangeText={setNegara}/>
                </View>
                <View style={styles.formcontrol}>
                    <Text>Pelabuhan</Text>
                    <TextInput style={styles.input} placeholder="Pelabuhan" value={pelabuhan} onChangeText={setPelabuhan}/>
                </View>
                <View style={styles.formcontrol}>
                    <Text>Barang</Text>
                    <TextInput style={styles.input} placeholder="Barang" onChangeText={setBarang} value={barang}/>
                </View>
                <View style={styles.formcontrol}>
                    <Text>Keterangan</Text>
                    <TextInput
                    multiline={true}
                    numberOfLines={10}
                    value={keterangan}
                    style={styles.inputarea} placeholder='Keterangan'/>
                </View>
                <View style={styles.formcontrol}>
                    <Text>Harga</Text>
                    <TextInput style={styles.input} placeholder="Harga" value={harga} onChangeText={setHarga}/>
                </View>
                <View style={styles.formcontrol}>
                    <Text>Tarif Bea Masuk %</Text>
                    <TextInput style={styles.input} placeholder="Tarif Bea Masuk %" value={tarifBea} editable={false}/>
                </View>
                <View style={styles.formcontrol}>
                    <Text>Biaya Bea Masuk</Text>
                    <TextInput style={styles.input} placeholder="Biaya Bea Masuk" value={total} editable={false}/>
                </View>
                <Button title="Reset" onPress={resetForm}/>
            </View>
        </ScrollView>

        </SafeAreaView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      formContent: {
        flex: 1,
        height: '100%',
        justifyContent:'space-around',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
        
      },
      formcontrol: {
        marginBottom: 15,
      },
      input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
      },
      inputarea: {
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
      },
})