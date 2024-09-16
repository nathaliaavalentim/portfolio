import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class TransactionForm extends StatefulWidget {
  final void Function(String, double, DateTime) onSubmit;

  TransactionForm(this.onSubmit);

  @override
  State<TransactionForm> createState() => _TransactionFormState();
}

class _TransactionFormState extends State<TransactionForm> {
  
  final _titleController = TextEditingController();
  final _valueController = TextEditingController();
  DateTime _selectedDate = DateTime.now();

  _submitedForm() {
    final title = _titleController.text;
    final value = double.tryParse(_valueController.text) ?? 0.0;
    
    if(title.isEmpty || value <= 0 || _selectedDate == null){
      return;
    }    
    widget.onSubmit(title, value, _selectedDate);
  }

  _showDatePicker(){
    showDatePicker(
      context: context, 
      firstDate: DateTime(2019), 
      lastDate: DateTime.now()
      ).then((selectedDate){
        if(selectedDate == null){
          return;
        }

        setState(() {
          _selectedDate = selectedDate;
        });
        
      });
  }

  @override
  Widget build(BuildContext context) {
    return Card(
        elevation: 5,
        child: Padding(
            padding: const EdgeInsets.all(10),
            child: Column(
              children: <Widget>[
                TextField(
                    controller: _titleController,
                    onSubmitted: (_) => _submitedForm(),
                    decoration: InputDecoration(
                      labelText: 'Título',
                    )),
                TextField(
                  controller: _valueController,
                  keyboardType: TextInputType.numberWithOptions(decimal: true),
                  onSubmitted: (_) => _submitedForm(),
                  decoration: InputDecoration(
                    labelText: 'Valor (R\$)',
                  ),
                ),
                Container(
                  height: 70,
                  child: Row(
                    children: <Widget>[
                      Expanded(
                        child: Text(
                          _selectedDate == null ? 
                          'Nenhuma data selecionada!': 
                          'Data selecionada: ${DateFormat('dd/MM/y').format(_selectedDate)}'),
                      ),
                      TextButton(
                        onPressed: _showDatePicker, 
                        child: Text('Selecionar data',
                                style: TextStyle(
                                  color: Theme.of(context).primaryColor,
                                  fontWeight: FontWeight.bold
                                ),
                              ),
                        )
                    ],
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: <Widget> [
                    TextButton(
                      child: Text('Nova Transação'),
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(Colors.purple),
                        foregroundColor: MaterialStateProperty.all(Colors.amber)
                      ),                     
                      onPressed: _submitedForm,
                    ),
                  ],
                )
              ],
            )));
  }
}
