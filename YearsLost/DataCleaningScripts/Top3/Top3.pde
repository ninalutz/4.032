Table Accidents, AIDS, Cereb, COPD, Diabetes, Diarrea, 
Ischemic, Malaria, Malnutrition, Resp, Suicide, Trachea, Tuber;

import java.util.Map;

void setup(){
  Accidents = loadTable("Accidents.csv", "header");
  AIDS = loadTable("AIDS.csv", "header");
  Cereb = loadTable("Cereb.csv", "header");
  COPD = loadTable("COPD.csv", "header");
  Diabetes = loadTable("Diabetes.csv", "header");
  Diarrea = loadTable("Diarrea.csv", "header");
  Ischemic = loadTable("Ischemic.csv", "header");
  Malaria = loadTable("Malaria.csv", "header");
  Malnutrition = loadTable("Malnutrition.csv", "header");
  Resp = loadTable("Resp.csv", "header");
  Suicide = loadTable("Suicide.csv", "header");
  Trachea = loadTable("Trachea.csv", "header");
  Tuber = loadTable("Tuber.csv", "header");
  doThing();
}

void draw(){}

ArrayList<HashMap>Maps = new ArrayList<HashMap>(); 
HashMap<String, HashMap> hm2  = new HashMap<String, HashMap>();

void doThing(){
    Table thing = new Table();
    thing.addColumn("ISO");
    thing.addColumn("Top1Cause");
    thing.addColumn("Top1Per");
    thing.addColumn("Top2Cause");
    thing.addColumn("Top2Per");
    thing.addColumn("Top3Per");
    thing.addColumn("Top3Cause");
    
  for(int i = 0; i<Accidents.getRowCount(); i++){
    TableRow newRow = thing.addRow();

    FloatList inventory = new FloatList();
    HashMap<Float, String> hm = new HashMap<Float, String>();
    
    inventory.append(Accidents.getFloat(i, "Deaths"));
    hm.put(Accidents.getFloat(i, "Deaths"),"Accidents");
    
    inventory.append(AIDS.getFloat(i, "Deaths"));
    hm.put(AIDS.getFloat(i, "Deaths"), "AIDS");
    
    inventory.append(Cereb.getFloat(i, "Deaths"));
    hm.put(Cereb.getFloat(i, "Deaths"), "Cereb");
    
    inventory.append(COPD.getFloat(i, "Deaths"));
    hm.put(COPD.getFloat(i, "Deaths"), "COPD");
     
    inventory.append(Diabetes.getFloat(i, "Deaths"));
    hm.put(Diabetes.getFloat(i, "Deaths"), "Diabetes");
    
    inventory.append(Diarrea.getFloat(i, "Deaths"));
    hm.put(Diarrea.getFloat(i, "Deaths"), "Diarrea");
    
    inventory.append(Ischemic.getFloat(i, "Deaths"));
    hm.put(Ischemic.getFloat(i, "Deaths"), "Ischemic");
    
    inventory.append(Malaria.getFloat(i, "Deaths"));
    hm.put(Malaria.getFloat(i, "Deaths"), "Malaria");
     
    inventory.append(Malnutrition.getFloat(i, "Deaths")); 
    hm.put(Malnutrition.getFloat(i, "Deaths"), "Malnutrition");
    
    inventory.append(Resp.getFloat(i, "Deaths"));  
    hm.put(Resp.getFloat(i, "Deaths"), "Resp");
    
    inventory.append(Suicide.getFloat(i, "Deaths"));
    hm.put(Suicide.getFloat(i, "Deaths"), "Suicide");
    
    inventory.append(Trachea.getFloat(i, "Deaths"));
    hm.put(Trachea.getFloat(i, "Deaths"), "Trachea");
    
    inventory.append(Tuber.getFloat(i, "Deaths")); 
    hm.put(Tuber.getFloat(i, "Deaths"), "Tuber");
    
    inventory.sortReverse();
    
    float totaldeath = 0;
    
    for(int j = 0; j<inventory.size(); j++){
        totaldeath += inventory.get(j);
    }
    
    newRow.setFloat("Top1Per", inventory.get(0)/totaldeath);
    newRow.setFloat("Top2Per", inventory.get(1)/totaldeath); 
    newRow.setFloat("Top3Per", inventory.get(2)/totaldeath); 
    
    newRow.setString("Top1Cause", hm.get(inventory.get(0)));
    newRow.setString("Top2Cause", hm.get(inventory.get(1)));
    newRow.setString("Top3Cause", hm.get(inventory.get(2)));
    newRow.setString("ISO",Accidents.getString(i, "ISO"));
    
  }
  saveTable(thing, "Causes.csv");
  println("DONE");
}