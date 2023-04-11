import React, { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MCOLORS } from '../consts';

type LayoutProps = {
    children: any;
};
const Layout: FC<LayoutProps> = ({ children }) => {
    return <SafeAreaView style={styles.layoutWrapper}>{children}</SafeAreaView>;
};
const styles = StyleSheet.create({
    layoutWrapper: { flex: 1, backgroundColor: MCOLORS.white },
});
export default Layout;
