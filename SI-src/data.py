df = pd.DataFrame([['full','monday','elektronika'],['full','tuesday','elektronika'],['full','wednesday','elektronika'],['full','thursday','elektronika'],['full','friday','elektronika'],['full','saturday','elektronika'],['full','sunday','elektronika'],['empty','monday','elektronika'],['empty','tuesday','elektronika'],['empty','wednesday','elektronika'],['empty','thursday','elektronika'],['empty','friday','elektronika'],['empty','saturday','elektronika'],['empty','sunday','elektronika'],['full','monday','budowlane'],['full','tuesday','budowlane'],['full','wednesday','budowlane'],['full','thursday','budowlane'],['full','friday','budowlane'],['full','saturday','budowlane'],['full','sunday','budowlane'],['empty','monday','budowlane'],['empty','tuesday','budowlane'],['empty','wednesday','budowlane'],['empty','thursday','budowlane'],['empty','friday','budowlane'],['empty','saturday','budowlane'],['empty','sunday','budowlane'],['full','monday','spozywcze'],['full','tuesday','spozywcze'],['full','wednesday','spozywcze'],['full','thursday','spozywcze'],['full','friday','spozywcze'],['full','saturday','spozywcze'],['full','sunday','spozywcze'],['empty','monday','spozywcze'],['empty','tuesday','spozywcze'],['empty','wednesday','spozywcze'],['empty','thursday','spozywcze'],['empty','friday','spozywcze'],['empty','saturday','spozywcze'],['empty','sunday','spozywcze'],['full','monday','chemia'],['full','tuesday','chemia'],['full','wednesday','chemia'],['full','thursday','chemia'],['full','friday','chemia'],['full','saturday','chemia'],['full','sunday','chemia'],['empty','monday','chemia'],['empty','tuesday','chemia'],['empty','wednesday','chemia'],['empty','thursday','chemia'],['empty','friday','chemia'],['empty','saturday','chemia'],['empty','sunday','chemia']])
df.columns = ['filling','day','type']
print df

type_mapping = {"elektronika" : 0, "budowlane":1, "spozywcze":2, "chemia":4}
df['type'] = df['type'].map(type_mapping)
filling_mapping = {"empty" : 0, "full":1}
df['filling'] = df['filling'].map(filling_mapping)
day_mapping = {"monday" : 0, "tuesday" : 1, "wednesday":2, "thursday":3, "friday":4, "saturday":5, "sunday":6}
df['day'] = df['day'].map(day_mapping)

pd.get_dummies(df[['filling','day','type']])
print df
X=array(df)
Y=[1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]
dt = DecisionTreeClassifier(min_samples_split=20, random_state=99)
dt.fit(X, Y)

tree.export_graphviz(dt,out_file='tree_dec.dot')
