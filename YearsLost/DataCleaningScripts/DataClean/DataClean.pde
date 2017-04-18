Table CereDeath, COPD, Diabetes, Diarrheal,
AIDS, Accidents, Ischemic, Resp, Malaria, 
Malnutrition, Suicide, Trachea, Tuber, AvgDeathF, AvgDeathM;

Table CereDeathF, COPDF, DiabetesF, DiarrhealF,
AIDSF, AccidentsF, IschemicF, RespF, MalariaF, 
MalnutritionF, SuicideF, TracheaF, TuberF, lifeexp;

void setup(){
  lifeexp = loadTable("data/LE60TOIN.csv", "header");
  AvgDeathF = loadTable("data/AVDTFEIN.csv", "header");
  AvgDeathM = loadTable("data/AVDTMAIN.csv", "header");
    avg(AvgDeathF, AvgDeathM, "AvgDeath.csv");
  
  
  CereDeath = loadTable("data/DECBMAIN.csv", "header");
  CereDeathF = loadTable("data/DECBFEIN.csv", "header");
  avg(CereDeath, CereDeathF, "Cereb.csv");
  
  COPD = loadTable("data/DEPDMAIN.csv", "header");
  COPDF = loadTable("data/DEPDFEIN.csv", "header");
  avg(COPD, COPDF, "COPD.csv");
  
  Diabetes = loadTable("data/DEDMFEIN.csv", "header");
  DiabetesF = loadTable("data/DEDMMAIN.csv", "header");
  avg(Diabetes, DiabetesF, "Diabetes.csv");
  
  Diarrheal = loadTable("data/DEDDFEIN.csv", "header");
  DiarrhealF = loadTable("data/DEDDMAIN.csv", "header");
  avg(Diarrheal, DiarrhealF, "Diarrea.csv");
  
  AIDS = loadTable("data/DEHAMAIN.csv", "header");
  AIDSF = loadTable("data/DEHAFEIN.csv", "header");
  avg(AIDS, AIDSF, "AIDS.csv");
  
  Accidents = loadTable("data/DEIJFEIN.csv", "header");
  AccidentsF = loadTable("data/DEIJMAIN.csv", "header");
  avg(AccidentsF, Accidents, "Accidents.csv");  
  
  Ischemic = loadTable("data/DEHDFEIN.csv", "header");
  IschemicF = loadTable("data/DEHDMAIN.csv", "header");
  avg(Ischemic, IschemicF, "Ischemic.csv");
  
  Resp = loadTable("data/DELRFEIN.csv", "header");
  RespF = loadTable("data/DELRMAIN.csv", "header");
  avg(Resp, RespF, "Resp.csv");
  
  Malaria = loadTable("data/DEMLFEIN.csv", "header");
  MalariaF = loadTable("data/DEMLMAIN.csv", "header");
  avg(MalariaF, Malaria, "Malaria.csv");
  
  Malnutrition = loadTable("data/DEMAFEIN.csv", "header");
  MalnutritionF = loadTable("data/DEMAMAIN.csv", "header");
  avg(Malnutrition, MalnutritionF, "Malnutrition.csv");
  
  Suicide = loadTable("data/DESH15FE.csv", "header");
  SuicideF = loadTable("data/DESH15MA.csv", "header");
  avg(Suicide, SuicideF, "Suicide.csv");    
  
  Trachea = loadTable("data/DELCFEIN.csv", "header");
  TracheaF = loadTable("data/DELCMAIN.csv", "header");
  avg(Trachea, TracheaF, "Trachea.csv"); 
  
  Tuber = loadTable("data/DETBFEIN.csv", "header");
  TuberF = loadTable("data/DETBMAIN.csv", "header");
  avg(Tuber, TuberF, "Tuber.csv");   
}

void draw(){

}


void avg(Table table1, Table table2, String saveAs){
    Table thing = new Table();
    thing.addColumn("ISO");
    thing.addColumn("Deaths");
    for(int j = 0; j<table2.getRowCount(); j++){
        TableRow newRow = thing.addRow();
        float deaththing = (table1.getFloat(j, "2010") + table2.getFloat(j, "2010"))/2;
        newRow.setString("ISO",table1.getString(j, "ISO"));
        newRow.setFloat("Deaths", deaththing);
        if(table1.getString(j, "ISO") == "WLD"){
          println(saveAs + "HAS WORLD");
        }
    }
    saveTable(thing, saveAs);
    println(thing.getRowCount(), table1.getRowCount(), table2.getRowCount());
    println("DONE with " + saveAs);
}