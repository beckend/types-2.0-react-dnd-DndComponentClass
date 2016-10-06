import React = require("react");
import ReactDnd = require("react-dnd");

import DndComponentClass = ReactDnd.DndComponentClass;
import DragSourceSpec = ReactDnd.DragSourceSpec;
import DragSourceCollector = ReactDnd.DragSourceCollector;
import DragSource = ReactDnd.DragSource;

// DndComponentClass DragSource test
// ----------------------------------------------------------------------
namespace DndComponentClassTest1 {
  interface IDndComponentClassTestProps {
    myStr1: string;
    id: string;
    type: string;
  }
  interface IIDndComponentClassTestSpecProps {
    widgetId: string;
  }
  interface IIDndComponentClassTestCollectProps {
    isDragging: boolean;
  }

  interface IDndComponentClassTestAllProps extends
    IDndComponentClassTestProps, IIDndComponentClassTestSpecProps {}
  class DndComponentClassTest extends React.Component<IDndComponentClassTestAllProps, {}> {

    public static defaultProps = {
      myStr1: 'test',
      id: 'Not set',
      type: 'widget1',
    };

    public render() {
      const props = this.props;
      return (
        <div>
          My Component {props.myStr1}
          My ID is: {props.id}
          My Widget ID: {props.widgetId}
        </div>
      )
    }

  }

  const draggableSpec: DragSourceSpec<IDndComponentClassTestProps> = {
    beginDrag(props, monitor, component) {
      return {
        widgetId: `${props.type}-${props.id}`,
      }
    }
  };
  const draggableCollect: DragSourceCollector =
    (connect, monitor): IIDndComponentClassTestCollectProps => ({
      isDragging: monitor.isDragging(),
    });


  const DraggableComponentTest1 =
    DragSource<IDndComponentClassTestProps>('Type1', draggableSpec, draggableCollect)(DndComponentClassTest);

  // Test render component created
  const TestJSXElement = <DraggableComponentTest1
    myStr1='overridden'
    id='new id'
    type='widget type 2'
  />;
}
